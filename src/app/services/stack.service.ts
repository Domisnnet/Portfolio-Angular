import { Injectable } from '@angular/core';
import { STACK_CONFIG, PillCategory, TagKey } from '@app/constants/project-tags.config';
import { PERSONAL_STACK } from '@app/constants/personal-stack.config';

@Injectable({ providedIn: 'root' })
export class StackService {
  getPersonalStack(category: PillCategory) {
    return PERSONAL_STACK[category].map(key => ({ key, ...STACK_CONFIG[key], }));
  }
}