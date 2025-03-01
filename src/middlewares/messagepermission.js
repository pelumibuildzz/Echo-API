const isPermitted = (req, res, next) => {
    let role = req.user.role
    if (role == "council") return next()
    let id = req.params.id
    let userid = req.user.id
    if (id == userid) return next()
    res.sendStatus(403)
}

module.exports = { isPermitted }    