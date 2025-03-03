var express = require("express");
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM mahasiswa ORDER BY id_mahasiswa DESC", function(err, rows) {
        if (err) {
            req.flash('error', err);
        } else {
            res.render('mahasiswa/index', {
                data: rows
            });
        }
    });
});

router.get('/create', function(req, res, next){
    res.render('mahasiswa/create',{
        nama: '',
        nrp: '',
        tgl_lahir: '',
        jenis_kelamin: '',
        agama: '',
        hoby: '',
        alamat: '',
        program_studi: ''
    })
});

router.post('/store', function(req, res, next){
    try{
        let {nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi} = req.body;
        let Data = {
            nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi
        };
        connection.query('INSERT INTO mahasiswa SET ?', Data, function(err,result){
            if(err){
                req.flash('error', 'Gagal menyimpan data');
            }else{
                req.flash('success', 'Berhasil menyimpan data');
            }
            res.redirect('/mahasiswa');
        })
    } catch(err) {
        req.flash('error', "Terjadi kesalahan pada fungsi");
        res.redirect('/mahasiswa');
    }
})

router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ' + id, function(err, rows){
        if(err){
            req.flash('error','Query gagal');
        }else{
            res.render('mahasiswa/edit',{
                id: rows[0].id_mahasiswa,
                nama: rows[0].nama,
                nrp: rows[0].nrp,
                tgl_lahir: rows[0].tgl_lahir,
                jenis_kelamin: rows[0].jenis_kelamin,
                agama: rows[0].agama,
                hoby: rows[0].hoby,
                alamat: rows[0].alamat,
                program_studi: rows[0].program_studi
            })
        }
    })
})

router.post('/update/(:id)', function(req, res, next){
    try{
        let id = req.params.id;
        let {nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi} = req.body;
        let Data = {
            nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi
        };
        connection.query('UPDATE mahasiswa SET ? WHERE id_mahasiswa = ' + id, Data, function(err){
            if(err){
                req.flash('error', 'Query gagal');
            }else{
                req.flash('success', 'Berhasil memperbarui data');
            }
            res.redirect('/mahasiswa');
        })
    } catch (error) {
        req.flash('error','Terjadi kesalahan pada router');
        res.redirect('/mahasiswa');
    }
})

router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ' + id, function(err){
        if(err){
            req.flash('error', 'Gagal query');
        }else{
            req.flash('success','Data terhapus');
        }
        res.redirect('/mahasiswa');
    })
})

module.exports = router;
