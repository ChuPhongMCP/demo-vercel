var express = require('express');
var router = express.Router();

const { uploadSingle, uploadMultiple, getSmallImg, getLargeImg } = require('./controller');

router.route('/upload-single/:objid')
  .post(uploadSingle);

router.route('/upload-multiple/:objid')
  .post(uploadMultiple);

router.route('/getLargeImg/:objid')
  .get(getLargeImg);

router.route('/getSmallImg/:objid')
  .get(getSmallImg);

module.exports = router;
