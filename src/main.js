// $('.test')
//   .on('click', () => alert('hello world!'))
//
$('.test').css('border', '1px solid red')
//
// $('.child').clone().appendTo($('.test').get(2))
// console.log($('.test').index())

$('body').delegate('click', '.test', (e, target) => {
  console.log('hello world' + this + e + target)
})