export class Device {
    public name: string;
    public status: any;
    public deviceId: any;
    public deviceUrl: string;

    constructor(name: string, status: any = 'offline', id: any, url: string) {
      this.name = name;
      this.status = status;
      this.deviceId = id;
      this.deviceUrl = url;
    }
  }
  