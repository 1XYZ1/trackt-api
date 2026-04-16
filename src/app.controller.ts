import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseService } from './supabase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Get('messages')
  async getMessages() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }
    return data;
  }
}
