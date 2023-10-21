import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// 입력 유효성 검사 유형(DTO라고도 함)을 구축할 때 동일한 유형에 대한 생성 및 업데이트 변형을 구축하는 것이 유용한 경우가 많습니다 .
// 예를 들어 create 변형은 모든 필드를 요구할 수 있지만 update 변형은 모든 필드를 선택 사항으로 만들 수 있습니다.

// Nest는 PartialType()이 작업을 더 쉽게 만들고 상용구를 최소화하기 위한 유틸리티 기능을 제공합니다.

// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;
//   @IsString()
//   readonly director?: string;
//   @IsNumber()
//   readonly year?: number;
//   @IsString()
//   readonly genres?: string[];
// }
