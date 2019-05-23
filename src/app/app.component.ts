import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import * as IpfsApi from 'ipfs-api';
import * as bcc from '@evan.network/api-blockchain-core-browserified';
import * as smartcontracts from '@evan.network/smart-contracts-core-browserified';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'evan-network-angular';
  init = false;

  async ngOnInit() {
    await this.initEvan();
    console.log('evan init done');
    this.init = true;
  }

  async initEvan() {
    // ipfs configuration for evan.network testnet storage
    const ipfsConfig = {host: 'ipfs.test.evan.network', port: '443', protocol: 'https'};
    // web3 provider config (currently evan.network testcore)
    const web3Provider = 'wss://testcore.evan.network/ws';

    // initialize dependencies
    const provider = new Web3.providers.WebsocketProvider(
      web3Provider,
      // {clientConfig: {keepalive: true, keepaliveInterval: 5000}},
    );
    const web3 = new Web3(provider,
      // {transactionConfirmationBlocks: 1, protocol: []}
    );
    const dfs = new bcc.Ipfs({remoteNode: new IpfsApi(ipfsConfig)});
    // create runtime
    const runtime = await bcc.createDefaultRuntime(web3, dfs, {
      mnemonic: 'leave best ship pulp hospital used damp decorate say mobile glance dilemma',
      password: 'T1234567',
    }, {
      contracts: smartcontracts,
    });
    console.dir(runtime);
  }
}
