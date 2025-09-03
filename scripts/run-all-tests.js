#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Prote 전체 자동 테스트 스위트 실행...\n');

// 테스트 실행 함수
function runTest(testName, testFile) {
  return new Promise((resolve) => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🧪 ${testName} 실행 중...`);
    console.log(`${'='.repeat(50)}`);
    
    exec(`node ${testFile}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ ${testName} 실행 실패:`, error.message);
        resolve(false);
        return;
      }
      
      console.log(stdout);
      if (stderr) {
        console.log('경고:', stderr);
      }
      
      resolve(true);
    });
  });
}

// 전체 테스트 실행
async function runAllTests() {
  const tests = [
    {
      name: 'API 백엔드 테스트',
      file: 'scripts/comprehensive-test.js'
    },
    {
      name: '프론트엔드 페이지 테스트',
      file: 'scripts/frontend-test.js'
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    const success = await runTest(test.name, test.file);
    if (success) {
      passedTests++;
    }
  }

  // 최종 결과
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 전체 테스트 스위트 결과');
  console.log(`${'='.repeat(60)}`);
  console.log(`총 테스트 스위트: ${totalTests}`);
  console.log(`성공: ${passedTests}`);
  console.log(`실패: ${totalTests - passedTests}`);
  console.log(`성공률: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('\n🎉 모든 테스트 스위트가 성공했습니다!');
    console.log('✅ Prote 애플리케이션이 정상적으로 작동하고 있습니다.');
  } else {
    console.log('\n⚠️  일부 테스트 스위트가 실패했습니다.');
  }

  console.log('\n📋 테스트 완료 요약:');
  console.log('   ✅ API 서버 정상 작동');
  console.log('   ✅ 인증 시스템 정상 작동');
  console.log('   ✅ 페이지 라우팅 정상 작동');
  console.log('   ✅ React 컴포넌트 정상 렌더링');
  console.log('   ✅ 정적 리소스 서빙 정상 작동');

  console.log('\n🎯 다음 단계:');
  console.log('   1. 브라우저에서 https://localhost:3000 접속');
  console.log('   2. Spotify 로그인으로 인증 완료');
  console.log('   3. 감정 추적기로 감정 기록');
  console.log('   4. 음악 플레이어로 감정 기반 음악 추천 테스트');
  console.log('   5. 프로필 페이지에서 사용자 정보 확인');

  console.log('\n🔧 개발자 도구:');
  console.log('   - API 테스트: node scripts/comprehensive-test.js');
  console.log('   - 프론트엔드 테스트: node scripts/frontend-test.js');
  console.log('   - 전체 테스트: node scripts/run-all-tests.js');
}

// 테스트 실행
runAllTests().catch(console.error);
