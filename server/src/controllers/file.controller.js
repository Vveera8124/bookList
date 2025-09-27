export const fileUpload = async (req, res) => {
  try {
    const { size, result } = req.file;
    res.json({
      message: "File processed successfully",
      size,
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
