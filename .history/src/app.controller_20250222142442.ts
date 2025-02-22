import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/react')
export class AppController {
	constructor(private readonly appService: AppService) {}
	
	@Get()
	getHello(): { value: number } {
		//return this.appService.getHello();
		const a = { value: 1 };
		return a;
	}
}
