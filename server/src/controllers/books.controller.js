import BookModel from "../models/book.model.js";
import bookSchema from "./schemaValidate.js";
import { createGzip } from "zlib";
import { pipeline, Readable } from "stream";
import { stringify } from "csv-stringify";

export const paginatedList = async (req, res) => {
  const { filters = {}, pagination = {}, sort = {} } = req.body;
  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 50;
  const skip = page * limit - limit;

  const allowedFields = ["title", "author", "genre", "publishedYear", "isbn"];
  const sortField = allowedFields.includes(sort.fieldName)
    ? sort.fieldName
    : "title";
  const sortOrder = sort.order === "desc" ? -1 : 1;

  const query = {};

  for (const key in filters) {
    if (allowedFields.includes(key) && filters[key] !== undefined) {
      query[key] = filters[key];
    }
  }

  const resultsPromise = BookModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [sortField]: sortOrder })
    .lean()
    .exec();

  const countPromise = BookModel.countDocuments(query);

  const [result, count] = await Promise.all([resultsPromise, countPromise]);

  const pages = Math.ceil(count / limit);
  const paginationDetail = { page, pages, count, limit };

  return res.status(200).json({
    success: true,
    result,
    paginationDetail,
    message:
      count > 0 ? "successfully found all documents" : "Collection is Empty",
  });
};

export const deleteRow = async (req, res) => {
  const { id } = req.params;
  console.log("delete triggered");
  const result = await BookModel.findByIdAndDelete({ _id: id });

  return res.status(200).json({
    success: result.deletedCount === 1,
    result: null,
    message: "Deleted successfully",
  });
};

export const updateRow = async (req, res) => {
  const { error, value } = bookSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  await BookModel.findByIdAndUpdate({ _id: req.params.id }, value).exec();

  return res.status(200).json({
    success: true,
    result: null,
    message: "Document updated",
  });
};

export const download = async (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=books.csv.gz");
  res.setHeader("Content-Type", "application/gzip");
  const { filters = {} } = req.body;
  const allowedFields = ["title", "author", "genre", "publishedYear", "isbn"];

  const query = {};

  for (const key in filters) {
    if (allowedFields.includes(key) && filters[key] !== undefined) {
      query[key] = filters[key];
    }
  }

  const gzip = createGzip();
  const stringifier = stringify({ header: true });
  const stream = BookModel.find(query)
    .select(allowedFields.join(" ") + " -_id")
    .lean()
    .cursor();

  // stream.on("data", (doc) => {
  //   stringifier.write(doc);
  // });

  // stream.on("end", () => stringifier.end());

  const readable = Readable.from(
    (async function* () {
      for await (const doc of stream) {
        yield doc;
      }
    })()
  );

  pipeline(readable, stringifier, gzip, res, (err) => {
    if (err) console.error("Pipeline failed", err);
  });
};
