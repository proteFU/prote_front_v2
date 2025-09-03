#!/usr/bin/env node

const https = require('https');
const http = require('http');

// HTTPS 요청을 위한 설정 (자체 서명된 인증서 무시)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const BASE_URL = 'https://localhost:3000';
const HTTP_BASE_URL = 'http://localhost:3000';

// API 테스트 함수
async function testAPI(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// HTTP 버전 (HTTPS가 실패할 경우)
async function testAPIHTTP(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, HTTP_BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// 테스트 실행
async function runTests() {
  console.log('🚀 Prote API 자동 테스트 시작...\n');

  const tests = [
    {
      name: 'API 상태 확인',
      endpoint: '/api/test',
      method: 'GET'
    },
    {
      name: '음악 추천 API',
      endpoint: '/api/music?type=recommendations&limit=5',
      method: 'GET'
    },
    {
      name: '감정 기반 음악 추천',
      endpoint: '/api/music?type=emotion&emotion=happy',
      method: 'GET'
    },
    {
      name: '플레이리스트 조회',
      endpoint: '/api/playlists',
      method: 'GET'
    },
    {
      name: '사용자 정보 조회',
      endpoint: '/api/users',
      method: 'GET'
    },
    {
      name: '친구 목록 조회',
      endpoint: '/api/friends',
      method: 'GET'
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    console.log(`📋 ${test.name} 테스트 중...`);
    
    try {
      let result;
      try {
        result = await testAPI(test.endpoint, test.method);
      } catch (httpsError) {
        console.log(`   ⚠️  HTTPS 실패, HTTP로 재시도...`);
        result = await testAPIHTTP(test.endpoint, test.method);
      }

      if (result.success) {
        console.log(`   ✅ 성공 (${result.status})`);
        if (result.data && typeof result.data === 'object') {
          console.log(`   📊 응답: ${JSON.stringify(result.data).substring(0, 100)}...`);
        }
        passedTests++;
      } else {
        console.log(`   ❌ 실패 (${result.status})`);
        if (result.data && result.data.error) {
          console.log(`   🔍 에러: ${result.data.error}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ 연결 실패: ${error.message}`);
    }
    console.log('');
  }

  // 결과 요약
  console.log('📊 테스트 결과 요약:');
  console.log(`   총 테스트: ${totalTests}`);
  console.log(`   성공: ${passedTests}`);
  console.log(`   실패: ${totalTests - passedTests}`);
  console.log(`   성공률: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('\n🎉 모든 테스트가 성공했습니다!');
  } else {
    console.log('\n⚠️  일부 테스트가 실패했습니다. 서버 상태를 확인해주세요.');
  }
}

// 테스트 실행
runTests().catch(console.error);
