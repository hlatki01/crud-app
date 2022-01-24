import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BelvoService } from 'src/app/services/belvo.service';


const xAuthToken = localStorage.getItem('bankconnector:token');
const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
  selector: 'app-home',
  template: `
  <div class="content" role="main">
    <div id="belvo"></div>
  </div>
`,
styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'widget-angular';


	constructor(
    private belvoService: BelvoService,
    public router: Router
	) { }

  ngOnInit() {
    /*
    if(!belvoToken)
		  this.loadScript('https://cdn.belvo.io/belvo-widget-1-stable.js');
    else
    this.router.navigateByUrl('/accounts');
    */
	}

  async createWidget() {

  function getAccessToken() {
        // Make sure to change /get-access-token to point to your server-side.
    return fetch('http://localhost:21075/users/token', {
                method: 'GET',
                headers: {
                  'x-token-access': xAuthToken
                }
            })
            .then(response => response.json())
            .then((data) => data)
            .catch(error => console.error('Error:', error))
    }
    const successCallbackFunction = (link, institution) => {
      localStorage.setItem('bankconnector:link', link);
      window.location.reload();
    }

    const onExitCallbackFunction = (data) => {
      console.log('onExitCallbackFunctiond', data)
    }
    const onEventCallbackFunction = (data) => {
      console.log('onEventCallbackFunction', data)
    }

    const config = {

    callback: (link, institution) => successCallbackFunction(link, institution),
    onExit: (data) => onExitCallbackFunction(data),
    onEvent: (data) => onEventCallbackFunction(data),
    access_mode: "single"
    }

    const { access } = await getAccessToken();
    // @ts-ignore

    window.belvoSDK.createWidget(access, config).build();
  }


  test() {
    this.router.navigateByUrl('/home');
  }


  loadScript(src: string) {
    let node = document.createElement('script');
    node.src = src;
    node.type = 'text/javascript';
    node.async = true;
    // Assign the callback which will create the Widget

    node.onload = this.createWidget;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
