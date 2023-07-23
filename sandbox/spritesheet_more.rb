require 'pixelart'


base = %w[
  base1
  base6
  base3
  base2
  base7
  base4
  base8
  base9
  base10
  base1-small
  base1-alien
  base1-demon
  base1-pepe
  base2-pepe
  base2-special
  base3-special
  base4-special
  base5-special
  base6-special
  base1-special
]


eyes = %w[
  eyes
  eyes2
  eyes7
  eyes8
  eyes3
  eyes5
  eyes6
  eyes9
  3dglasses
  lasereyes
  lasereyes2
  shades
  shades2
  visor
  visor2 
]

##  eyes4
##  eyepatch


accessories = %w[
   mohawk
   bandana
   bandana2
   beanie
   cap
   cap2
   cap3
   cap4
   cap6
   cap7
   knittedcap
   knittedcap2
   frenchcap
   cowboyhat
   policecap
   tophat
   hat
   hat2
   hat3
   helmet
   helmet2
   crown
   halo
   earring
]

#  cap5
 

## 1/1s or punks
mores = %w[
  squiggle
]


names = base + eyes + accessories + mores

puts "  #{names.size} name(s)"
## => 63 name(s)



composite = ImageComposite.new( 10, 6, width: 28,
                                       height: 28 )


names.each do |name|
   path = "./#{name}.png"
   puts "==> reading >#{path}<..."
   img = Image.read( path )
   composite << img
end

composite.save( "./tmp/spritesheet-more.png" )
composite.zoom(4).save( "./tmp/spritesheet-more@4x.png" )

puts "bye"