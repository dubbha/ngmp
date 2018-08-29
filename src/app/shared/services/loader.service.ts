import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  loading = false;

  start() {
    this.loading = true;
  }

  stop() {
    this.loading = false;
  }
}
