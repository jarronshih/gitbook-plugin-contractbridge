# gitbook-plugin-contractbridge

## Format

### Suit
- spade: !S
- heart: !H
- diamand: !D
- club: !C
- no trump: !N

#### example
```
!S
!H
!D
!C
!N
```

### Bids
- use ```{% bids %}``` ```{% endbids %}``` to wrap it.
- title
    - no format
- bids
    - use ```:=``` to split

#### example
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

### inline bid seqence
- when writing bid seqence in paragraph.

####
```
.... ``` 1!C-1!D; ?? ``` .....

```

