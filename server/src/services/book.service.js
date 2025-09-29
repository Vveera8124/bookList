import csvParser from "csv-parser";
import BookModel from "../models/book.model.js";
import bookSchema from "../controllers/schemaValidate.js";
import pkg from "lodash";
const { camelCase } = pkg;
class BookService {
  static async processCsv(stream) {
    return new Promise((resolve, reject) => {
      const batchArray = [];
      const failedRows = [];
      let rowNumber = 0;

      const BATCH_SIZE = process.env.BATCH_SIZE;

      const parser = stream.pipe(
        csvParser({ mapHeaders: ({ header }) => camelCase(header) })
      );

      parser.on("data", async (row) => {
        rowNumber++;
        const { error, value } = bookSchema.validate(row, {
          stripUnknown: true,
        });

        if (error) {
          failedRows.push({ [rowNumber]: row });
        } else {
          batchArray.push(value);
        }

        if (batchArray.length >= BATCH_SIZE) {
          parser.pause();
          try {
            await BookService.insertBatch(batchArray);
            batchArray.length = 0;
            parser.resume();
          } catch (err) {
            parser.destroy(err);
          }
        }
      });

      parser.on("end", async () => {
        if (batchArray.length > 0) {
          try {
            await BookService.insertBatch(batchArray);
          } catch (err) {
            return reject(err);
          }
        }
        resolve({ successCount: rowNumber - failedRows.length, failedRows });
      });

      parser.on("error", (err) => reject(err));
    });
  }

  static async insertBatch(batch) {
    await BookModel.insertMany(batch, { ordered: false });
  }
}

export default BookService;
