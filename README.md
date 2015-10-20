# gitbook-plugin-contractbridge

## Format

### Suit
- spade: !S
- heart: !H
- diamand: !D
- club: !C
```
!S
!H
!D
!C
```

### Bidding System Table
- seq: write bidding sequence
- bids: write bid and define, using ```##``` to separate

```
{% biddingSystemTable %}
{% seq %}
1N - ??
{% bids %}
2C      ##Stayman 
2DH     ##Jacoby transfer
2N      ##NAT, GT.
{% endbiddingSystemTable %}
```

### Bidding Quizz
```
{% biddingQuiz 
    player="North", 
    spades="KQ4", 
    hearts="KT6", 
    diams="KJT3", 
    clubs="742",
    bids=["?"],
    answer="Pass"
    %}
{% endbiddingQuiz %}
```