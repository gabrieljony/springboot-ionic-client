import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;
  private readonly bucketAmazonS3 = environment.bucketAmazonS3;

  constructor(public storage: StorageService,
    public clienteService: ClienteService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();
          console.log(this.cliente)
        },
          error => {

          })
    }
  }

  /**
   * Método para testar se a imagem exite
   */
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id, this.cliente.dateImageUrl)
      .subscribe(response => {
        this.cliente.imageUrl = `${this.bucketAmazonS3}/${this.cliente.dateImageUrl}_cp${this.cliente.id}.jpg`
      },
        error => { })
  }

}
