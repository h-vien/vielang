import { Operator } from '@parser/types/operator'
import { Spec } from '@parser/types/spec'
import { Keyword } from './keyword'

export const SpecIdentifier = [/^[A-Za-z\u00C0-\u1EF9]+(\s[A-Za-z\u00C0-\u1EF9]+)*/, Keyword.IDENTIFIER] as Spec

export const Specs: Array<Spec> = [
  // --------------------------------------
  // Whitespace:
  [/^\s+/, null],

  [/^\u0063\u0068\u0069\u1EC1\u0075\u0020\u0064\u00E0\u0069\u0020\u006D\u1EA3\u006E\u0067/g, Keyword.SIZE],

  // --------------------------------------
  // Comments:
  // Skip single-line comments:
  [/^\/\/.*/, null],
  // Skip multi-line comments:
  [/^\/\*[\S\s]*?\*\//, null],

  [/^\+\+/, '++'], // PlusPlus
  [/^--/, '--'], // MinusMinus

  // --------------------------------------
  // Math operators: +, -, *, /
  [/^[+\-]/, Keyword.ADDITIVE_OPERATOR],
  [/^[*\/\%]/, Keyword.MULTIPLICATIVE_OPERATOR],
  // Relational operators: >, >=, <, <=
  [/^(<=|>=|<|>|==)/, Keyword.RELATIONAL_OPERATOR],
  // --------------------------------------
  // Symbols and delimiters:
  [/^\[/, '['], // OpenBracket
  [/^]/, ']'], // CloseBracket
  [/^\(/, '('], // OpenParen
  [/^\)/, ')'], // CloseParen
  [/^{/, '{'], // OpenBrace
  [/^}/, '}'], // CloseBrace
  [/^;/, ';'], // SemiColon
  [/^,/, ','], // Comma
  [/^===/, '==='], // IdentityEquals
  [/^==/, '=='], // Equals_
  [/^!==/, '!=='], // IdentityNotEquals
  [/^!=/, '!='], // NotEquals
  [/^=/, '='], // Assign
  [/^\?/, '?'], // QuestionMark
  [/^\?\.?/, '?.'], // QuestionMarkDot
  [/^:/, ':'], // Colon
  [/^\.{3}/, '...'], // Ellipsis
  [/^\./, '.'], // Dot
  [/^\+/, '+'], // Plus
  [/^-/, '-'], // Minus
  [/^~/, '~'], // BitNot
  [/^!/, '!'], // Not
  [/^\*/, '*'], // Multiply
  [/^\//, '/'], // Divide
  [/^%/, '%'], // Modulus
  [/^\*\*/, '**'], // Power
  [/^\?\?/, '??'], // NullCoalesce
  [/^#/, '#'], // Hashtag
  [/^>>>=/, '>>>='], // RightShiftLogicalAssign
  [/^>>>/, '>>>'], // RightShiftLogical
  [/^>>/, '>>'], // RightShiftArithmetic
  [/^>>=/, '>>='], // RightShiftArithmeticAssign
  [/^<<=/, '<<='], // LeftShiftArithmeticAssign
  [/^<</, '<<'], // LeftShiftArithmetic
  [/^<=/, '<='], // LessThanEquals
  [/^>=/, '>='], // GreaterThanEquals
  [/^</, '<'], // LessThan
  [/^>/, '>'], // MoreThan
  [/^&&/, '&&'], // And
  [/^\|\|/, '||'], // Or
  [/^&/, '&'], // BitAnd
  [/^\^/, '^'], // BitXOr
  [/^\|/, '|'], // BitOr
  [/^\*=/, '*='], // MultiplyAssign
  [/^\//, '/='], // DivideAssign
  [/^%=/, '%='], // ModulusAssign
  [/^\+=/, '+='], // PlusAssign
  [/^-=/, '-='], // MinusAssign
  [/^&=/, '&='], // BitAndAssign
  [/^\^=/, '^='], // BitXorAssign
  [/^\|=/, '|='], // BitOrAssign
  [/^\*\*=/, '**='], // PowerAssign
  [/^=>/, '=>'], // ARROW

  // --------------------------------------
  // Keywords
  [/^\b(var|khai b\u00E1o)\b/, Keyword.LET], // khai báo
  [/\u0070\u0068\u00E1\u0020\u0068\u0075\u1EF7/g, Keyword.BREAK], // phá huỷ
  [/\u0074\u0068\u1EF1\u0063\u0020\u0068\u0069\u1EC7\u006E/g, Keyword.DO], // thực hiện
  [/^\binstanceof\b/, Keyword.INSTANCEOF],
  [/^\b(typeof|ki\u1EC3u c\u1EE7a)\b/, Keyword.TYPEOF], // kiểu của
  [/^\b(switch|duy\u1EC7t)\b/, Keyword.SWITCH], // duyệt
  [/^\b(case|tr\u01B0\u1EDDng h\u1EE3p)\b/, Keyword.CASE], // trường hợp
  [/^\b(if|n\u1EBFu)\b/, Keyword.IF], // nếu
  [/^\b(else|kh\u00F4ng th\u00EC)/, Keyword.ELSE], // không thì
  [/^\bnew\b/, Keyword.NEW],
  [/^\b(catch|b\u1EAFt l\u1ED7i)\b/, Keyword.CATCH], // bắt lỗi
  [/^\b(finally|cu\u1ED1i c\u00F9ng)\b/, Keyword.FINALLY], // cuối cùng
  [/^\b(return|tr\u1EA3 v\u1EC1)/, Keyword.RETURN], // trả về
  [/^\bvoid\b/, Keyword.VOID],
  [/^\b(continue|ti\u1EBFp t\u1EE5c)\b/, Keyword.CONTINUE], // tiếp tục
  [/^\b(for|\u006C\u1EB7\u0070)\b/, Keyword.FOR], // lặp
  [/\u006B\u0068\u0069\u0020\u006D\u00E0/g, Keyword.WHILE], // khi mà
  [/^\bdebugger\b/, Keyword.DEBUGGER],
  [/^\b(function|h\u00E0m)\b/, Keyword.FUNCTION], // hàm
  [/^\bthis\b/, Keyword.THIS], // đối tượng này
  [/^\bwith\b/, Keyword.WITH], // với
  [/^\b(default|m\u1EB7c \u0111\u1ECBnh)\b/, Keyword.DEFAULT], // mặc định
  [/^\b(throw|b\u00E1o l\u1ED7i)\b/, Keyword.THROW], // báo lỗi
  [/^\b(delete|xo\u00E1)\b/, Keyword.DELETE], // xoá
  [/^\b(in|trong)\b/, Keyword.IN], // trong
  [/^\b(try|th\u1EED)/, Keyword.TRY], // thử
  [new RegExp('^\\b(as|như là)'), Keyword.AS], // như là
  [new RegExp('^\\b(from|từ)'), Keyword.FROM], // từ

  // --------------------------------------
  // Future Reserved Words
  [/^const|h\u1EB1ng s\u1ED1/, Keyword.CONST], // hằng số
  [/^\b(class|l\u1EDBp)\b/, Keyword.CLASS], // lớp
  [/^\b(super|kh\u1EDFi t\u1EA1o cha)\b/, Keyword.SUPER], // khởi tạo cha
  [/^\b(constructor|kh\u1EDFi t\u1EA1o)\b/, Keyword.CONSTRUCTOR], // khởi tạo
  [/^\b(extends|k\u1EBF th\u1EEBa)\b/, Keyword.EXTENDS], // kế thừa
  [/^\b(export|cho ph\u00E9p)\b/, Keyword.EXPORT], // xuất, cho phép
  [/^\b(import|s\u1EED d\u1EE5ng)\b/, Keyword.IMPORT], // nhập, sử dụng
  [/^\b(async|b\u1EA5t \u0111\u1ED3ng b\u1ED9)/, Keyword.ASYNC], // bất đồng bộ
  [/^\b(await|ch\u1EDD)\b/, Keyword.AWAIT], // chờ
  [/^\byield\b/, Keyword.YIELD],
  [/^\blet\b/, Keyword.LET],
  [/^\bprivate\b/, Keyword.PRIVATE],
  [/^\bpublic\b/, Keyword.PUBLIC],
  [/^\bprotected\b/, Keyword.PROTECTED],
  [/^\bstatic\b/, Keyword.STATIC],

  // --------------------------------------
  // Primitive Literals:

  // --------------------------------------
  // Numbers:
  [/^(\d+(\.|)(\d+|)([Ee]([+-]|)\d+|))/, Keyword.NUMBER],

  // --------------------------------------
  // Double quoted String:
  [/^"[^"]*"/, Keyword.STRING],

  // --------------------------------------
  // Single quoted String:
  [/^'[^']*'/, Keyword.STRING],

  // --------------------------------------
  // Template quoted String:
  [/^`[^`]*`/, Keyword.STRING],

  // --------------------------------------
  // Literal with Keyword:

  [/^\bNaN\b/, Keyword.NAN],

  [/(true|false|\u0111\u00FAng|sai)\b/, Keyword.BOOLEAN],
  // eslint-disable-next-line no-control-regex

  // --------------------------------------
  // Identifier
  SpecIdentifier
]

export const EdgeCaseSpecs: Array<[string, Keyword | Operator | null]> = [
  ['vô giá trị', Keyword.NULL],
  ['không xác định', Keyword.UNDEFINED]
]
