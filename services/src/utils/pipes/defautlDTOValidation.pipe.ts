/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-08-14 21:06:38
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-08-16 16:15:24
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DefaultDTOValidationPipe implements PipeTransform<any> {
  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value, {
      excludeExtraneousValues: true,
    });
    // 删除未验证的值及非法值
    const deleteUndefined = instanceToPlain(object);

    for (const i in deleteUndefined) {
      if (deleteUndefined[i] === undefined || deleteUndefined[i] === '') {
        delete deleteUndefined[i];
      }
    }

    const delObj = plainToClass(metatype, deleteUndefined);
    const errors = await validate(delObj);

    console.log(errors, value, delObj);

    if (errors.length > 0) {
      console.log('error', Object.values(errors[0].constraints)[0]);
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      console.error(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return deleteUndefined;
  }
}
