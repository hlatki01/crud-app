import { AfterViewInit, Component, ElementRef, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RocketchatService } from 'src/app/services/rocketchat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-chat',
  template: `<iframe [src]="iframeURL" #iframeTagName (load)="loadIframe(iframeTagName)" style="height:92%; width:100%; border: none;"><iframe>`,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  iframeURL;
  private isInited;

  private rocketToken = JSON.parse(localStorage.getItem('bankconnector:user'));


  @ViewChild('iframe') iframe: ElementRef;

	constructor(
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer,
    private rocketServices: RocketchatService,
    ){
      this.iframeURL= this.domSanitizer.bypassSecurityTrustResourceUrl('https://chat.lgrocket.ga');
    }

   ngOnInit(): void {
   }

   loadIframe(iframeTagName) {
     console.log('rocketToken', this.rocketToken.rocketToken);


      // post message to iframe
      iframeTagName.contentWindow.postMessage({
            externalCommand: 'login-with-token',
            token: this.rocketToken.rocketToken
          }, '*');

      // You can receive response from iframe if any
      this.renderer.listen('window', 'message', (event) => {
        //console.log(event);


        if (event.origin !== 'https://chat.lgrocket.ga') {
          return;
        }

        // handle event here

     });


  }
}
