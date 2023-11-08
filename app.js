const fs = require('fs');
const path = require('path');
ㅔ
// 파일이 .txt 파일인지 확인하는 함수
const istTxtFile = (fileName) => {
  // 경로의 확장자를 반환한다.
  // toLowerCase() : 문자열 내의 모든 알파벳 문자를 소문자로 변환하는 역할
  let result = path.extname(fileName).toLowerCase() === '.txt';
  return result; // 문자열이다.
};

// 두 .txt 파일을 비교하는 함수 
const compareFiles = (operator, operand) => {
  try { // 예외 처리
    // 파일 확장자 검사
    if (!istTxtFile(operator) || !istTxtFile(operand)) {
      console.error('둘다 .txt파일이 아닙니다.');
      return false;
    }

    // 파일의 전체 경로를 생성
    // __dirname 현재 파일의 위치를 나타낸다.
    const filePathOperator = path.join(__dirname, operator);
    const filePathOperand = path.join(__dirname, operand);

    // 순서대로(동기적으로) 파일을 읽게 접미사인 Sync를 붙였다.(Node.js에서 Sync는 동기적으로 실행한다는 의미이다.) 
    const dataOperator = fs.readFileSync(filePathOperator, 'utf8')
    const dataOperand = fs.readFileSync(filePathOperand, 'utf8')

    let isResult = dataOperator === dataOperand;
    // 파일의 내용을 비교하여 결과를 반환한다.
    return isResult;
  } catch(error) {
    console.error('Error reading files:', error);
    return false;
  }
};

// 함수 사용 예
const areFileEqual = compareFiles('operator.txt', 'operand.txt');
console.log(areFileEqual); // 내용이 같다면 true, 같지 않다면 false를 출력한다.

// 출력 결과
// 둘다 .txt파일이 아닙니다.
// false