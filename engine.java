import java.util.Scanner;

class engine {
    static int m_p, m_and, prod;

    public static void print(String concat) {
        System.out.println(concat + "\nm.and\tm.p\tprod\n" + Integer.toBinaryString(m_and) + "\t"
                + Integer.toBinaryString(m_p) + "\t" + Integer.toBinaryString(prod));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter multiplicand, then the multiplier:");
        m_and = sc.nextInt();
        m_p = sc.nextInt();
        sc.close();

        print("Start");

        prod = m_p;
        print("Prod = m.p");

        prod <<= 1; // shift left one
        print("Prod shift left one");

        for (int i = 0; i < 4; i++) {
            System.out.println("Prod % 4 = " + Integer.toBinaryString(prod % 4));
            if (prod % 4 == 1) {
                prod += m_and << 5;
            } else if (prod % 4 == 2) {
                prod -= m_and << 5;
            }
            prod >>= prod;
        }

        prod >>= prod;

        System.out.println("result:\n" + prod);
        System.out.println(Integer.toBinaryString(prod));
    }
}

// Write a program to implement an 8-bit Booth’s Multiplier for signed numbers.
// • Input in Decimal
// • Output in both Binary and Decimal
// • Show all the steps in a tabular format
// In a word/pdf report, show test runs for the following input combinations:
// 9 X 1, -9 X –9, 100 X 0, -9 X 9, 127 X -127, 500 X -5

// Types of Shift Operators:

// Shift Operators are further divided into 4 types. These are:

// Signed Right shift operator (>>)
// Unsigned Right shift operator (>>>)
// Left shift operator(<<)
// Unsigned Left shift operator (<<<)