import prisma from '../src/lib/prisma.js';

async function main() {
    await prisma.book.deleteMany();
    await prisma.user.deleteMany();

    const books = [
        { title: "JavaScript 완벽 가이드", author: "데이비드 플래너건" },
        { title: "클린 코드", author: "로버트 C. 마틴" },
        { title: "리팩터링", author: "마틴 파울러" },
        { title: "디자인 패턴", author: "GoF" },
        { title: "Node.js 교과서", author: "조현영" },
        { title: "React 완벽 가이드", author: "막시밀리안" },
        { title: "프로그래밍 패턴", author: "스토얀 스테파노프" },
        { title: "HTTP 완벽 가이드", author: "데이비드 고울리" }
    ];

    for (const book of books) {
        await prisma.book.create({
            data: book
        });
    }

    console.log('초기 도서 데이터가 성공적으로 생성되었습니다.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
