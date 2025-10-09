# Jersey Text Splitting Examples

## How Multi-Word Text is Displayed

The jersey component now intelligently splits team names across multiple lines when they contain spaces, making the text more readable and aesthetically pleasing.

### Front Jersey Text Display

#### Single Word Teams
```
┌─────────┐
│    ○    │ ← Collar
│ WARRIORS│ ← Single line
│    18   │ ← Jersey number
└─────────┘
```

#### Two Word Teams
```
┌─────────┐
│    ○    │ ← Collar
│  MUMBAI │ ← First word
│ WARRIORS│ ← Second word
│    18   │ ← Jersey number
└─────────┘
```

#### Three Word Teams
```
┌─────────┐
│    ○    │ ← Collar
│  ROYAL  │ ← First word
│CHALLENGERS│ ← Second word (truncated if too long)
│BANGALORE│ ← Third word
└─────────┘
```

### Back Jersey Display

Shows player's LAST NAME:
```
┌─────────┐
│   ───   │ ← Back collar
│   18    │ ← Large jersey number
│  KOHLI  │ ← Last name only
└─────────┘
```

### Dashboard Bust Display

#### Single Word
```
┌────┐
│ ○  │
│TEAM│
└────┘
```

#### Multi-Word (Smaller font)
```
┌────┐
│ ○  │
│CITY│
│TEAM│
└────┘
```

## Real Examples

### Team: "Mumbai Warriors"
- **Front**: "MUMBAI" on first line, "WARRIORS" on second line
- **Back**: "KOHLI" (if player is "Virat Kohli")

### Team: "Royal Challengers Bangalore"
- **Front**: "ROYAL", "CHALLENGE" (truncated), "BANGALOR" (truncated)
- **Back**: Player's last name

### Team: "Chennai Super Kings"
- **Front**: "CHENNAI", "SUPER", "KINGS"
- **Back**: Player's last name

### Team: "TEAM" (single word)
- **Front**: "TEAM" (centered, single line)
- **Back**: Player's last name

## Technical Details

### Line Spacing
- **Small jerseys**: 8px between lines
- **Medium jerseys**: ~14px between lines  
- **Large jerseys**: ~17px between lines

### Text Truncation
- Each word is limited to 10 characters maximum
- Prevents overflow on small jerseys
- Maintains readability

### Font Styling
- All uppercase text
- Letter spacing: 1-1.5px for readability
- Bold weight for visibility
- Arial font family (web-safe)

## Word Processing Logic

```javascript
// Split by spaces, filter empty strings
const words = teamName.trim().split(' ').filter(w => w.length > 0);

if (words.length === 1) {
    // Display as single line
} else {
    // Display each word on separate line
    words.map((word, index) => displayWord(word, lineIndex))
}
```

## Color Application

- **Text Color**: Secondary team color
- **Background**: Primary team color
- **Borders**: Secondary team color
- **Ensures high contrast and readability**

## Benefits

✅ **Better Readability**: Multi-line text easier to read
✅ **More Professional**: Looks like real cricket jerseys
✅ **Flexible**: Works with any team name length
✅ **Responsive**: Adjusts to jersey size
✅ **Authentic**: Matches real-world jersey designs
