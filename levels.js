// 0 = wall
// 1 = road
// 'd' = door
// 'k' = key
// 't' = torch
// 'c' = carpet
// 'b' = barrel
// 'bs' = bookshelf
// 's' = spike trap
// 'hp' = health potion
// 'st' = stairs

export const level1 = 
[
   0,1,0,0,0,'t',1,1,1,1,'g',1,1,1,'b',
   0,1,1,1,1,1,1,0,'t',0,1,0,0,1,'k',
   0,0,'t',1,0,0,0,0,0,0,'d',0,0,0,0,
   0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,
   0,1,'g',1,0,'d','t','sl',0,0,0,0,'t',1,0,
   0,'k',1,1,0,1,0,1,0,1,1,1,1,'g',0,
   0,0,0,0,0,1,0,'sr',0,1,0,0,0,0,0,
   0,1,1,'bs',1,1,0,1,0,1,1,1,1,1,0,
   0,1,'c',1,1,1,'t','sl',0,0,0,0,'t',1,0,
   't',1,'g',1,1,1,0,1,0,0,0,1,1,1,0,
   0,1,1,1,1,1,0,'sr',0,1,1,1,0,0,0,
   0,'b',1,1,1,1,0,1,0,1,1,1,0,0,0,
   0,0,0,0,0,0,'t','sl',0,'hp',1,'b',0,0,0,
   0,'k','hp',1,1,1,1,1,0,0,'d',0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,1,1,1,'g','st',
];