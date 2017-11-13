# gitbook-plugin-contractbridge
[![Build Status](https://travis-ci.org/jarronshih/gitbook-plugin-contractbridge.svg?branch=master)](https://travis-ci.org/jarronshih/gitbook-plugin-contractbridge)

## Format
### Suit
Support suit and no trump:
- no trump: !N
- spade: !S
- heart: !H
- diamand: !D
- club: !C

#### example
```
!S =
!H
!D
!C
!N
```

### inline bid sequence
```
... example bidding `1!C-1!D; ??`, and description ...

```


### Bids
- use `{% bids %}` `{% endbids %}` to wrap it.
- title
    - The first line without `:=` will be the title line.
- bids
    - use `:=` to split the bid and description.
- right align
    - use `>>` for right aligned


#### Example 1
```
{% bids %}
1!N-2!C; 2!D-??
2!H     := 4-4 M's weak.
2!S     := 5!S's INV. Opener passes with MIN, bids 2!N with MAX no fit, responder can rebid 3m=to play.
2!N     := INV, promises a 4-card major.
3!C/!D  := 5+!C/!D's slam try with a 4-card major.
3!H/!S  := Smolen.
{% endbids %}
```

#### Example 2
```
{% bids %}
1!C -      := 3+!C
>>    1!D; := 4+!D
1!S -      := 4+!S
{% endbids %}
```

## Development
```
npm link
npm unlink
```
