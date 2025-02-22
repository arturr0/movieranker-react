import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/react')
export class AppController {
	constructor(private readonly appService: AppService) {}
	
	@Get()
	getHello(): number {
		//return this.appService.getHello();
		const a = 0;
		return a;
	}
}
