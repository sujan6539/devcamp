exports.getBootcamps = (req, res, next) => {
    res.send({msg : 'success'})

}

exports.createBootcamps = (req, res, next) => {
    res.status(201).send({msg : 'bootcamps created.'})
}

exports.updateBootcamps = (req, res, next) => {
    console.log(req.params.id)
    res.status(200).json({msg: ' bootcamp updated.', id : req.params.id})

}