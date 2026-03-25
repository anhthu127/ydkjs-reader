export const books = [
  {
    id: 'scope-closures',
    title: 'Phạm vi & Đóng cửa',
    titleEn: 'Scope & Closures',
    description: 'Tìm hiểu về hệ thống phạm vi và các chức năng đóng của JavaScript',
    chapters: [
      { id: 'foreword', title: 'Lời nói đầu', file: 'foreword-vn.md' },
      { id: 'ch1', title: 'Chương 1: Phạm vi là gì?', file: 'ch1-vn.md' },
      { id: 'ch2', title: 'Chương 2: Minh họa phạm vi từ vựng', file: 'ch2-vn.md' },
      { id: 'ch3', title: 'Chương 3: Chuỗi phạm vi', file: 'ch3-vn.md' },
      { id: 'ch4', title: 'Chương 4: Xung quanh phạm vi toàn cầu', file: 'ch4-vn.md' },
      { id: 'ch5', title: 'Chương 5: Vòng đời bí mật của các biến', file: 'ch5-vn.md' },
      { id: 'ch6', title: 'Chương 6: Giới hạn phạm vi tiếp xúc', file: 'ch6-vn.md' },
      { id: 'ch7', title: 'Chương 7: Sử dụng Closure', file: 'ch7-vn.md' },
      { id: 'ch8', title: 'Chương 8: Mẫu mô-đun', file: 'ch8-vn.md' },
      { id: 'apA', title: 'Phụ lục A: Khám phá thêm', file: 'apA-vn.md' },
      { id: 'apB', title: 'Phụ lục B: Thực hành', file: 'apB-vn.md' }
    ]
  },
  {
    id: 'objects-classes',
    title: 'Đối tượng & Lớp',
    titleEn: 'Objects & Classes',
    description: 'Tìm hiểu sâu về đối tượng và lớp trong JavaScript',
    chapters: [
      { id: 'foreword', title: 'Lời nói đầu', file: 'foreword-vn.md' },
      { id: 'ch1', title: 'Chương 1: Nền tảng đối tượng', file: 'ch1-vn.md' },
      { id: 'ch2', title: 'Chương 2: Cách thức hoạt động của các đối tượng', file: 'ch2-vn.md' },
      { id: 'ch3', title: 'Chương 3: Đối tượng đẳng cấp', file: 'ch3-vn.md' },
      { id: 'ch4', title: 'Chương 4: Tác phẩm này', file: 'ch4-vn.md' },
      { id: 'ch5', title: 'Chương 5: Phái đoàn', file: 'ch5-vn.md' },
      { id: 'thanks', title: 'Cảm ơn bạn!', file: 'thanks-vn.md' }
    ]
  },
  {
    id: 'types-grammar',
    title: 'Các Loại & Ngữ Pháp',
    titleEn: 'Types & Grammar',
    description: 'Khám phá các kiểu dữ liệu và ngữ pháp JavaScript',
    chapters: [
      { id: 'foreword', title: 'Lời nói đầu', file: 'foreword-vn.md' },
      { id: 'ch1', title: 'Chương 1: Giá trị nguyên thủy', file: 'ch1-vn.md' },
      { id: 'ch2', title: 'Chương 2: Hành vi nguyên thủy', file: 'ch2-vn.md' },
      { id: 'ch3', title: 'Chương 3: Giá trị đối tượng', file: 'ch3-vn.md' },
      { id: 'ch4', title: 'Chương 4: Giá trị ép buộc', file: 'ch4-vn.md' },
      { id: 'thanks', title: 'Cảm ơn bạn!', file: 'thanks-vn.md' }
    ]
  },
  {
    id: 'sync-async',
    title: 'Đồng bộ & Bất đồng bộ',
    titleEn: 'Sync & Async',
    description: 'Tìm hiểu về lập trình đồng bộ và bất đồng bộ',
    chapters: [
      { id: 'foreword', title: 'Lời nói đầu', file: 'foreword-vn.md' },
      { id: 'ch1', title: 'Chương 1', file: 'ch1-vn.md' }
    ]
  }
];

export const estimatedReadingTimes = {
  'foreword': 5,
  'ch1': 30,
  'ch2': 30,
  'ch3': 25,
  'ch4': 25,
  'ch5': 30,
  'ch6': 25,
  'ch7': 35,
  'ch8': 30,
  'apA': 20,
  'apB': 15,
  'thanks': 5
};
