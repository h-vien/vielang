import { Program } from '@parser/program'
import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'

describe('Test for program', () => {
  it('Should return a program with multiple constant declaration', () => {
    const code = `   hằng số tuổi = 20; hằng số địa chỉ = "Đà Nẵng";
    hằng số tên = "Viên Huỳnh";
  `
    const result = parserNode.parse(code, Program)

    expect(toPlainObject(result)).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'NumericLiteral',
                value: 20,
                extra: {
                  rawValue: 20,
                  raw: '20'
                },
                start: 18,
                end: 20
              },
              id: {
                type: 'Identifier',
                name: 'tu_7893i'
              }
            }
          ],
          kind: 'const'
        },
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'StringLiteral',
                value: 'Đà Nẵng',
                extra: {
                  rawValue: 'Đà Nẵng',
                  raw: '"Đà Nẵng"'
                },
                start: 40,
                end: 49
              },
              id: {
                type: 'Identifier',
                name: '_273_7883a_ch_7881'
              }
            }
          ],
          kind: 'const'
        },
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'StringLiteral',
                value: 'Viên Huỳnh',
                extra: {
                  rawValue: 'Viên Huỳnh',
                  raw: '"Viên Huỳnh"'
                },
                start: 69,
                end: 81
              },
              id: {
                type: 'Identifier',
                name: 't_234n'
              }
            }
          ],
          kind: 'const'
        }
      ]
    })
  })

  it('Should parse prime check number correctly', () => {
    const code = `
    hàm primeCheck(số)
    {
        nếu (số < 2)
            trả về sai;
        lặp (khai báo i = 2; i < số; ++i){
            khai báo test = số % i
            nếu ( test == 0){
                trả về sai
            }
            trả về đúng;
        }

    }

    `

    const result = parserNode.parse(code, Program)
    expect(toPlainObject(result)).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          async: false,
          id: {
            type: 'Identifier',
            name: 'primeCheck'
          },
          params: [
            {
              type: 'Identifier',
              name: 's_7889'
            }
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'IfStatement',
                test: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 's_7889'
                  },
                  operator: '<',
                  right: {
                    type: 'NumericLiteral',
                    value: 2,
                    extra: {
                      rawValue: 2,
                      raw: '2'
                    },
                    start: 48,
                    end: 49
                  }
                },
                consequent: {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'BooleanLiteral',
                    value: false,
                    start: 70,
                    end: 73
                  }
                }
              },
              {
                type: 'ForStatement',
                init: {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'NumericLiteral',
                        value: 2,
                        extra: {
                          rawValue: 2,
                          raw: '2'
                        },
                        start: 101,
                        end: 102
                      },
                      id: {
                        type: 'Identifier',
                        name: 'i'
                      }
                    }
                  ],
                  kind: 'let'
                },
                test: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'i'
                  },
                  operator: '<',
                  right: {
                    type: 'Identifier',
                    name: 's_7889'
                  }
                },
                update: {
                  type: 'UpdateExpression',
                  operator: '++',
                  argument: {
                    type: 'Identifier',
                    name: 'i'
                  },
                  prefix: true
                },
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Identifier',
                              name: 's_7889'
                            },
                            operator: '%',
                            right: {
                              type: 'Identifier',
                              name: 'i'
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'test'
                          }
                        }
                      ],
                      kind: 'let'
                    },
                    {
                      type: 'IfStatement',
                      test: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'test'
                        },
                        operator: '==',
                        right: {
                          type: 'NumericLiteral',
                          value: 0,
                          extra: {
                            rawValue: 0,
                            raw: '0'
                          },
                          start: 179,
                          end: 180
                        }
                      },
                      consequent: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'BooleanLiteral',
                              value: false,
                              start: 206,
                              end: 209
                            }
                          }
                        ]
                      }
                    },
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'BooleanLiteral',
                        value: true,
                        start: 243,
                        end: 247
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    })
  })
  it('Should parse bubble sort algorithm correctly', () => {
    const code = `hàm sắp xếp(arr) {
        khai báo độ dài  = 4
        khai báo test = 3
        lặp (khai báo i = 0; i < độ dài; i++) {
            
            lặp (khai báo j = 0; j < test - i ; j++) {
    
                nếu (arr[j] > arr[j + 1]) {
    
                    khai báo temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
    
        in ra(arr);
    }`
    const result = parserNode.parse(code, Program)
    console.log(JSON.stringify(result, null, 2))
  })
})
