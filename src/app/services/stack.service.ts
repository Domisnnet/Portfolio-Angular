import { Injectable } from '@angular/core';
import { STACK_CONFIG, PillCategory, TagKey } from '../constants/project-tags.config';
import { PERSONAL_STACK } from '../constants/personal-stack.config';

@Injectable({ providedIn: 'root' })
export class StackService {

  getPersonalStack(category: PillCategory) {
    return PERSONAL_STACK[category].map(key => ({ key, ...STACK_CONFIG[key], }));
  }
}