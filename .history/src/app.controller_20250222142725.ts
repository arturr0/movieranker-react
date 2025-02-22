import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}
	
	@Get('react')
	getHello(): { value: number } {
		//return this.appService.getHello();
		const a = { value: 0 };
		return a;
	}
}
