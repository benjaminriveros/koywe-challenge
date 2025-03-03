import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export interface SecurityOptions {
  frameOptions?: string;
  xssProtection?: string;
  contentTypeOptions?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
}

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private options: SecurityOptions = {}) {}

  use(req: Request, res: Response, next: NextFunction): void {
    // Clickjacking
    res.setHeader('X-Frame-Options', this.options.frameOptions || 'DENY');
    
    // XSS
    res.setHeader('X-XSS-Protection', this.options.xssProtection || '1; mode=block');
    
    // Sniffing MIME types
    res.setHeader('X-Content-Type-Options', this.options.contentTypeOptions || 'nosniff');
    
    // Content Security Policy
    if (this.options.contentSecurityPolicy) {
      res.setHeader('Content-Security-Policy', this.options.contentSecurityPolicy);
    } else {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
      );
    }
    
    // Strict Transport Security
    if (this.options.strictTransportSecurity) {
      res.setHeader('Strict-Transport-Security', this.options.strictTransportSecurity);
    } else {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
    }
    
    next();
  }
} 