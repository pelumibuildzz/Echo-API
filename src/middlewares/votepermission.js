const canUpdate = (req, res, next) => {
    let userid = req.user.id
    if (req.body.userid == userid) return next()
    res.sendStatus(403)
}

module.exports = { canUpdate }