const validateSchema = (schema) => async (req, res, next) => { // thực thi việc xác thực
  try {
      await schema.validate(
          {
              body: req.body,
              query: req.query,
              params: req.params,
          },
          {
              abortEarly: false,
          }
      )
      return next()
  } catch (err) {
      console.log('««««« err »»»»»', err)
      return res.status(200).json({ type: err.name, errors: err.errors, provider: "YUP" })
  }
}

module.exports = {
  validateSchema,
}