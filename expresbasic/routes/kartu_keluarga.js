var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function(req, res, next){
    connection.query("select * from kartu_keluarga order by no_kk desc", function(err, rows){
        if(err){
            req.flash('error',err);
        }else{
            res.render('kartu_keluarga/index',{
                data: rows
            });
        }
    });
});

router.get('/create', function(req, res, next){
    res.render('kartu_keluarga/create',{
        no_kk: '',
        alamat: '',
        rt: '',
        rw: '',
        kode_pos: '',
        desa_kelurahan: '',
        kecamatan: '',
        kabupaten_kota: '',
        provinsi: ''
    })
});

router.post('/store', function(req, res, next){
    try {
        let {no_kk, alamat, rt, rw, kode_pos, desa_kelurahan, kecamatan, kabupaten_kota, provinsi} = req.body;
        let Data = {
            no_kk, alamat, rt, rw, kode_pos, desa_kelurahan, kecamatan, kabupaten_kota, provinsi
        }
        connection.query('insert into kartu_keluarga set ?', Data, function(err, result){
            if(err){
                req.flash('error','Gagal menyimpan data!');
            }else{
                req.flash('success','Berhasil menyimpan data!');
            }
            res.redirect('/kartu_keluarga');
        })
    } catch {
        req.flash('error','Terjadi kesalahan pada fungsi')
        res.redirect('/kartu_keluarga');
    }
})

router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;
    connection.query('select * from kartu_keluarga where no_kk = ' + id, function(err, rows){
        if(err){
            req.flash('error','query gagal');
        }else{
            res.render('kartu_keluarga/edit',{
                id: rows[0].no_kk,
                no_kk: rows[0].no_kk,
                alamat: rows[0].alamat,
                rt: rows[0].rt,
                rw: rows[0].rw,
                kode_pos: rows[0].kode_pos,
                desa_kelurahan: rows[0].desa_kelurahan,
                kecamatan: rows[0].kecamatan,
                kabupaten_kota: rows[0].kabupaten_kota,
                provinsi: rows[0].provinsi
            })
        }
    })
})

router.post('/update/(:id)', function(req, res, next){
    try{
        let id = req.params.id;
        let {no_kk, alamat, rt, rw, kode_pos, desa_kelurahan, kecamatan, kabupaten_kota, provinsi} = req.body;
        let Data = {
            no_kk, alamat, rt, rw, kode_pos, desa_kelurahan, kecamatan, kabupaten_kota, provinsi
        }
        connection.query('update kartu_keluarga set ? where no_kk = ' + id, Data, function(err){
            if(err){
                req.flash('error', 'query gagal');
            }else{
                req.flash('succes', 'Berhasil memperbarui data');
            }
            res.redirect('/kartu_keluarga');
        })
    } catch (error) {
        req.flash('error','Terjadi kesalahan pada router');
        res.redirect('/kartu_keluarga');
    }
})

router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id;
    connection.query('delete from kartu_keluarga where no_kk = ' + id, function(err){
        if(err){
            req.flash('error', 'gagal query');
        }else{
            req.flash('success','Data terhapus');
        }
        res.redirect('/kartu_keluarga');
    })
})

module.exports = router;