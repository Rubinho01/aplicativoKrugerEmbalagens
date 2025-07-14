const adminService = require('../services/adminService');

exports.entrarAdmin = async (req, res) => {
    const {nome, senha} = req.body
    try {
        const admin = await adminService.buscarAdmin({nome, senha});
        req.session.adminId = admin.id;
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(401).send(error.message);
    }
    
}