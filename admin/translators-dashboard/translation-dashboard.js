const demoText = `
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
        Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
        Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
`

function initDraftToggler(isDisabled = true) {
  const draftTogglerNode = document.getElementById('toggler-draft')
  $('#toggler-draft').bootstrapToggle(isDisabled ? 'disable' : 'enable')
  $('#toggler-draft').bootstrapToggle('off')
}

function setTargetLanguageSelect() {
  const srcLanguageNode = document.getElementById('src-lng')
  const srcLanguage = srcLanguageNode.value
  
  const tgtLanguageNode = document.getElementById('tgt-lng')
  tgtLanguageNode.removeAttribute('disabled')
  
  if (tgtLanguageNode.value == srcLanguage) {
    tgtLanguageNode.value = ""
  }
  
  for (let opt of tgtLanguageNode.options) {
    if (opt.getAttribute('value') == srcLanguage) {
      opt.setAttribute('disabled', '')
    } else {
      opt.removeAttribute('disabled')
    }
  }
  $('#tgt-lng').selectpicker('refresh');
}

function onSourceLanguageSelect(event) {
  const srcSelectNode = document.getElementById('src-select')
  srcSelectNode.value = ""
  
  const srcLanguageNode = document.getElementById('src-lng')
  const srcLanguage = srcLanguageNode.value
  
  for (let opt of srcSelectNode.options) {
    if (opt.getAttribute('data-lng') != srcLanguage) {
      opt.setAttribute('hidden', '')
    } else {
      opt.removeAttribute('hidden')
    }
  }

  $('#src-select').selectpicker('refresh');
  setTargetLanguageSelect()
}

function onSourceSelect(event, option) {
  const srcLanguageNode = document.getElementById('src-lng')
  srcLanguageNode.value = option.getAttribute('data-lng')
  
  $('#src-lng').selectpicker('refresh');
  setTargetLanguageSelect()
}

function onSelect(event) {
   if($("#form-select")[0].checkValidity()) {
     document.getElementById('src-text').value = demoText

     document.getElementById('tgt-lng').setAttribute('disabled', '')
     document.getElementById('src-lng').setAttribute('disabled', '')
     document.getElementById('src-select').setAttribute('disabled', '')
     document.getElementById('status-saved').removeAttribute('hidden')    
     document.getElementById('tr-text').removeAttribute('disabled')
   } else {  
     $("#form-select")[0].reportValidity();
   }
}

function onReset(event) {
  for (let id of ['src-select', 'src-lng', 'tgt-lng']) {
    selectElem = document.getElementById(id)
    selectElem.removeAttribute('disabled')
    for (let opt of selectElem.options) {
      if (opt.value) {
        opt.removeAttribute('hidden')
        opt.removeAttribute('disabled')
      }
    }
    selectElem.value = ""
  }
  $('.selectpicker').selectpicker('refresh');
  
  for (let elem of document.getElementsByClassName('status')) {
    elem.setAttribute('hidden', '')
  }
  
  const trTextElem = document.getElementById('tr-text')
  trTextElem.addEventListener('input', onTranslationChanged)
  trTextElem.setAttribute('disabled', '')
  
  document.getElementById('form-content').reset()
  
  document.getElementById('btn-save').setAttribute('disabled', '')

  initDraftToggler()
}

function setTranslationStatus(status) {
  const id = 'status-' + status
  console.log(id)
  const statusNodes = document.getElementsByClassName('status')
  
  for (let statusNode of statusNodes) {
    console.log(statusNode)
    if (statusNode.id == id) {
      statusNode.removeAttribute('hidden')
    } else {
      statusNode.setAttribute('hidden', '')
    }
  }
}

function onTranslationChanged(event) {
  setTranslationStatus('draft')
  document.getElementById('tr-text')
    .removeEventListener('input', onTranslationChanged)
  document.getElementById('btn-save')
    .removeAttribute('disabled')

  initDraftToggler(false)
}

function onSave(event) {
  setTranslationStatus('saved')
  document.getElementById('tr-text')
    .addEventListener('input', onTranslationChanged)
  document.getElementById('btn-save')
    .setAttribute('disabled', '')
  initDraftToggler()
}

document.getElementById('btn-select')
  .onclick = onSelect 
document.getElementById('src-lng')
  .onchange = onSourceLanguageSelect
document.getElementById('src-select')
  .onchange = function(event) {
  onSourceSelect(event, this.options[this.selectedIndex])
}
document.getElementById('btn-reset')
  .onclick = onReset
document.getElementById('tr-text')
  .addEventListener('input', onTranslationChanged)
document.getElementById('btn-save')
  .onclick = onSave

$.fn.selectpicker.Constructor.BootstrapVersion = '4';

initDraftToggler()
