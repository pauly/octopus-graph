# octopus-graph

A bit hacky to try and avoid too many dependencies, I might clean this up.

1. See https://octopus.energy/dashboard/developer/ to get your key etc
2. `curl -u "your-key-here:" "https://api.octopus.energy/v1/electricity-meter-points/your-mpan/meters/your-serial-number/consumption/?period_from=2022-06-12T00:00:00Z" > ./data/electricity_this_week.json
3. `./scripts/octopus.js > output.html

<svg viewBox="0 0 890 110" fill="transparent" xmlns="http://www.w3.org/2000/svg" font-size="0.6em">
  <desc>Energy usage graph</desc>
  <rect x="30" y="15" width="800" height="80" />
  <svg stroke="#9e9">
    <desc>Kwh 💡 graph line</desc>
    <polyline points="30,88 32,91 35,89 37,89 40,90 42,89 44,90 47,89 49,90 52,90 54,89 56,90 59,89 61,90 64,89 66,83 68,84 71,86 73,84 76,86 78,81 80,77 83,71 85,73 87,75 90,77 92,81 95,86 97,84 99,82 102,29 104,54 107,57 109,50 111,57 114,78 116,82 119,73 121,59 123,53 126,73 128,86 131,88 133,88 135,90 138,89 140,91 143,89 145,90 147,90 150,89 152,91 155,89 157,88 159,88 162,89 164,90 167,89 169,90 171,89 174,85 176,90 179,80 181,86 183,86 186,85 188,87 190,68 193,84 195,84 198,77 200,84 202,85 205,86 207,79 210,86 212,83 214,83 217,78 219,84 222,52 224,30 226,58 229,74 231,71 234,47 236,47 238,72 241,83 243,87 246,88 248,90 250,89 253,91 255,89 258,91 260,90 262,90 265,90 267,88 270,88 272,90 274,91 277,89 279,91 281,90 284,89 286,82 289,89 291,89 293,89 296,89 298,87 301,86 303,85 305,85 308,87 310,84 313,88 315,89 317,89 320,88 322,89 325,90 327,89 329,90 332,69 334,82 337,84 339,80 341,81 344,79 346,81 349,70 351,55 353,72 356,85 358,86 361,87 363,90 365,90 368,90 370,90 373,91 375,90 377,89 380,92 382,89 384,90 387,91 389,89 392,87 394,89 396,90 399,89 401,85 404,79 406,87 408,86 411,87 413,88 416,90 418,88 420,83 423,49 425,58 428,85 430,87 432,87 435,89 437,59 440,66 442,85 444,83 447,83 449,84 452,81 454,82 456,71 459,56 461,76 464,77 466,89 468,86 471,83 473,89 476,90 478,89 480,91 483,89 485,91 487,89 490,90 492,88 495,88 497,91 499,89 502,90 504,90 507,90 509,90 511,90 514,90 516,84 519,86 521,89 523,88 526,89 528,90 531,88 533,86 535,91 538,89 540,89 543,89 545,88 547,88 550,86 552,87 555,87 557,88 559,84 562,85 564,84 567,82 569,82 571,58 574,66 576,72 579,84 581,87 583,87 586,89 588,78 590,89 593,88 595,89 598,89 600,89 602,90 605,86 607,88 610,89 612,88 614,90 617,89 619,89 622,89 624,89 626,89 629,88 631,81 634,88 636,88 638,88 641,88 643,89 646,86 648,88 650,87 653,87 655,89 658,87 660,87 662,89 665,88 667,89 670,85 672,87 674,88 677,85 679,85 681,82 684,62 686,63 689,50 691,80 693,89 696,87 698,89 701,85 703,87 705,89 708,88 710,89 713,89 715,91 717,89 720,91 722,90 725,87 727,89 729,88 732,91 734,90 737,89 739,90 741,90 744,89 746,90 749,87 751,81 753,82 756,87 758,87 761,88 763,83 765,86 768,86 770,82 773,85 775,90 777,89 780,87 782,88 784,89 787,89 789,90 792,85 794,85 796,89 799,87 801,61 804,65 806,70 808,84 811,88 813,85 816,89 818,89 820,88 823,88 825,87 828,87 830,90" fill="none" />
  </svg>
  <text fill="#9e9" x="830" y="90">Kwh 💡</text>
  <line x1="61" y1="90" x2="61" y2="59" stroke="#ddd" />
  <rect x="59" y="59" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="61" y="69">🕖 £0.56</text>
  <text fill="#9e9" x="112" y="29">⚠️ 1.66Kwh 💡</text>
  <line x1="140" y1="91" x2="140" y2="6" stroke="#ddd" />
  <rect x="107" y="6" width="43" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="110" y="16">Sun £5.68</text>
  <line x1="176" y1="90" x2="176" y2="59" stroke="#ddd" />
  <rect x="174" y="59" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="176" y="69">🕖 £0.65</text>
  <line x1="255" y1="89" x2="255" y2="6" stroke="#ddd" />
  <rect x="217" y="6" width="48" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="220" y="16">Mon £5.36</text>
  <line x1="291" y1="89" x2="291" y2="58" stroke="#ddd" />
  <rect x="289" y="58" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="291" y="68">🕖 £0.66</text>
  <line x1="370" y1="90" x2="370" y2="9" stroke="#ddd" />
  <rect x="337" y="9" width="43" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="340" y="19">Tue £3.72</text>
  <line x1="406" y1="87" x2="406" y2="56" stroke="#ddd" />
  <rect x="404" y="56" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="406" y="66">🕖 £0.72</text>
  <line x1="485" y1="91" x2="485" y2="6" stroke="#ddd" />
  <rect x="447" y="6" width="48" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="450" y="16">Wed £4.52</text>
  <line x1="521" y1="89" x2="521" y2="58" stroke="#ddd" />
  <rect x="519" y="58" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="521" y="68">🕖 £0.66</text>
  <line x1="600" y1="89" x2="600" y2="5" stroke="#ddd" />
  <rect x="567" y="5" width="43" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="570" y="15">Thu £3.50</text>
  <line x1="636" y1="88" x2="636" y2="57" stroke="#ddd" />
  <rect x="634" y="57" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="636" y="67">🕖 £0.76</text>
  <line x1="715" y1="91" x2="715" y2="9" stroke="#ddd" />
  <rect x="682" y="9" width="43" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="685" y="19">Fri £3.69</text>
  <line x1="751" y1="81" x2="751" y2="47" stroke="#ddd" />
  <rect x="749" y="47" width="40" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="751" y="57">🕖 £0.69</text>
  <line x1="830" y1="90" x2="830" y2="9" stroke="#ddd" />
  <rect x="797" y="9" width="43" height="12" fill="#fff" stroke="#ddd" />
  <text fill="#9e9" x="800" y="19">Sat £3.53</text>
  <svg fill="#999" text-anchor="end">
    <path d="m 30 15 v 80 h 800" stroke="#999" fill="transparent" stroke-width="2" />
    <text x="30" y="95">0 -</text>
    <text x="30" y="75">0.5 -</text>
    <text x="30" y="55">1 -</text>
    <text x="30" y="35">1.5 -</text>
    <text x="258" y="102.5" text-anchor="start">Jun 14</text>
    <text x="373" y="102.5" text-anchor="start">Jun 15</text>
    <text x="487" y="102.5" text-anchor="start">Jun 16</text>
    <text x="602" y="102.5" text-anchor="start">Jun 17</text>
    <text x="717" y="102.5" text-anchor="start">Jun 18</text>
    <text x="832" y="102.5" text-anchor="start">Jun 19</text>
  </svg>
</svg>
