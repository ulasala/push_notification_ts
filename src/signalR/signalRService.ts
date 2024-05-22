// signalRService.ts
import * as signalR from '@microsoft/signalr';
import toast from 'react-hot-toast';

class SignalRService {
  public connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5163/notificationhub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on('ReceiveNotification', (user: string, message: string) => {
      console.log(`User ${user} says ${message}`);
      toast.success(message, {
        duration: 4000,
        position: 'top-right',
      });
    });

    this.connection
      .start()
      .catch((err) => console.error('SignalR Connection Error: ', err));
  }

  public sendMessage(user: string, message: string): void {
    this.connection
      .invoke('SendNotification', user, message)
      .catch((err) => console.error(err));
  }
}

const signalRService = new SignalRService();
export default signalRService;
