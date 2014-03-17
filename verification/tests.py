"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [1, 2, 3],
            "answer": 3,
            "explanation": [[1, 2, 3, 1]]
        },

        {
            "input": [11, 13, 29, 31],
            "answer": 0,
            "explanation": [[11, 13, 31, 29, 11]]
        },
        {
            "input": [26, 11, 13, 24],
            "answer": 4,
            "explanation": [[24, 11, 13, 26, 24]]
        },

        {
            "input": [4, 5, 9, 13, 12, 7],
            "answer": 6,
            "explanation": [[4, 5, 9, 13, 12, 7, 4]]
        },
        {
            "input": [29],
            "answer": 0,
            "explanation": []
        },
        {
            "input": [11, 13, 23, 25],
            "answer": 0,
            "explanation": [[11, 13], [23, 25]]
        },
        {
            "input": [2, 4, 5],
            "answer": 3,
            "explanation": [[2, 4, 5, 2]]
        },
        {
            "input": [4, 5, 6],
            "answer": 0,
            "explanation": [[4, 5, 6]]
        },

        {
            "input": [11, 4, 6, 15, 26, 24],
            "answer": 6,
            "explanation": [[11, 4, 6, 15, 26, 24, 11]]
        },
        {
            "input": [11, 4, 6, 15, 26],
            "answer": 0,
            "explanation": [[11, 4, 6, 15, 26]]
        },
        {
            "input": [23, 3, 28],
            "answer": 3,
            "explanation": [[23, 3, 28, 23]]
        },
        {
            "input": [30, 12, 15, 36],
            "answer": 0,
            "explanation": [[30, 12, 15, 36, 30]]
        },
        {
            "input": [30, 12, 15, 33],
            "answer": 4,
            "explanation": [[30, 12, 15, 33, 30]]
        },
        {
            "input": [22, 11, 17, 8, 13, 6],
            "answer": 0,
            "explanation": [[22, 11], [17, 8], [13, 6]]
        },
        {
            "input": [2, 6, 8],
            "answer": 0,
            "explanation": []
        },

    ],
    "Extra": [
        {
            "input": [1, 2, 3],
            "answer": 3,
            "explanation": [[1, 2, 3, 1]]
        },

        {
            "input": [11, 13, 29, 31],
            "answer": 0,
            "explanation": [[11, 13, 31, 29, 11]]
        },
        {
            "input": [26, 11, 13, 24],
            "answer": 4,
            "explanation": [[24, 11, 13, 26, 24]]
        },

        {
            "input": [4, 5, 9, 13, 12, 7],
            "answer": 6,
            "explanation": [[4, 5, 9, 13, 12, 7, 4]]
        },
        {
            "input": [29],
            "answer": 0,
            "explanation": []
        },
        {
            "input": [11, 13, 23, 25],
            "answer": 0,
            "explanation": [[11, 13], [23, 25]]
        },
        {
            "input": [2, 4, 5],
            "answer": 3,
            "explanation": [[2, 4, 5, 2]]
        },
        {
            "input": [4, 5, 6],
            "answer": 0,
            "explanation": [[4, 5, 6]]
        },

        {
            "input": [11, 4, 6, 15, 26, 24],
            "answer": 6,
            "explanation": [[11, 4, 6, 15, 26, 24, 11]]
        },
        {
            "input": [11, 4, 6, 15, 26],
            "answer": 0,
            "explanation": [[11, 4, 6, 15, 26]]
        },
        {
            "input": [23, 3, 28],
            "answer": 3,
            "explanation": [[23, 3, 28, 23]]
        },
        {
            "input": [30, 12, 15, 36],
            "answer": 0,
            "explanation": [[30, 12, 15, 36, 30]]
        },
        {
            "input": [30, 12, 15, 33],
            "answer": 4,
            "explanation": [[30, 12, 15, 33, 30]]
        },
        {
            "input": [22, 11, 17, 8, 13, 6],
            "answer": 0,
            "explanation": [[22, 11], [17, 8], [13, 6]]
        },
        {
            "input": [8, 9, 12, 13, 18, 19],
            "answer": 0,
            "explanation": [[8, 9], [9, 13], [13, 19], [19, 18], [18, 12], [12, 8]]
        },
        {
            "input": [8, 10, 17, 19, 32, 34],
            "answer": 0,
            "explanation": [[8, 10], [10, 19], [19, 34], [34, 32], [32, 17], [17, 8]]
        },


    ],

    "Extra2": [
        {
            "input": [1, 32386, 32640],
            "answer": 3,
            "explanation": None
        },
        {
            "input": [32131, 32638, 32640],
            "answer": 3,
            "explanation": None
        },
        {
            "input": [31627, 31376, 31628, 31880],
            "answer": 4,
            "explanation": None
        },

        ]
}
