import { NextRequest, NextResponse } from 'next/server';

// Mock 친구 데이터
const mockFriends = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://picsum.photos/300/300?random=101',
    status: 'accepted',
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    image: 'https://picsum.photos/300/300?random=102',
    status: 'accepted',
    lastActive: new Date(Date.now() - 7200000).toISOString(), // 2시간 전
  },
  {
    id: '3',
    name: 'Mike Smith',
    email: 'mike@example.com',
    image: 'https://picsum.photos/300/300?random=103',
    status: 'accepted',
    lastActive: new Date(Date.now() - 86400000).toISOString(), // 1일 전
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    image: 'https://picsum.photos/300/300?random=104',
    status: 'accepted',
    lastActive: new Date(Date.now() - 172800000).toISOString(), // 2일 전
  }
];

// 친구 목록 조회
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockFriends
    });

  } catch (error) {
    console.error('Friends Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch friends' },
      { status: 500 }
    );
  }
}

// 친구 요청
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { friend_email } = body;

    if (!friend_email) {
      return NextResponse.json(
        { error: 'Friend email is required' },
        { status: 400 }
      );
    }

    // Mock 친구 요청 데이터
    const friendRequest = {
      id: Date.now().toString(),
      user_id: 'guest@example.com',
      friend_id: friend_email,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: friendRequest
    });

  } catch (error) {
    console.error('Friend Request Error:', error);
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 }
    );
  }
}

// 친구 요청 수락/거절
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { friendship_id, status } = body;

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be accepted or rejected' },
        { status: 400 }
      );
    }

    // Mock 친구 요청 응답 데이터
    const friendResponse = {
      id: friendship_id,
      user_id: 'guest@example.com',
      friend_id: 'friend@example.com',
      status,
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: friendResponse
    });

  } catch (error) {
    console.error('Friend Response Error:', error);
    return NextResponse.json(
      { error: 'Failed to respond to friend request' },
      { status: 500 }
    );
  }
}
