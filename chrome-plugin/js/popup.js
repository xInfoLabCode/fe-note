function bindClick() {
  const input = $('#input'),
    input2 = $('#input2'),
    btn = $('#btn')

  input.value = 111

  btn.addEventListener('click', function(e) {
    input2.value = input.value
    console.log(111, document)
  })
}

window.onload = function() {
  bindClick()
}
