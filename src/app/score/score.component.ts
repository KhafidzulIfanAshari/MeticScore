import { Component, OnInit } from '@angular/core';
import { KelompokMetic } from '../prosesData/data.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataService } from '../prosesData/data.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  kelompokList: KelompokMetic[];
  
  constructor(public fireService: DataService , private toast: ToastrService) { }

  ngOnInit() {
    var keldat = this.fireService.getDataKelompok();
    keldat.snapshotChanges().subscribe(item => {
      this.kelompokList = [];
      item.forEach(element => {
        var newitem = element.payload.toJSON();
        newitem["$key"] = element.key;
        this.kelompokList.push(newitem as KelompokMetic);
      });
    });
  }

  updatedSkor(kelForm: NgForm){
    this.updatedSkor(kelForm.value);  
    this.toast.success('Data Skor telah terkirim' , 'Selamat');
  }

  onEdit(klmp: KelompokMetic) {
    this.fireService.selectedKelompok = Object.assign({}, klmp);
  }

}
