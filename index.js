const modal = $.modal({
  title: 'Vladilen Modal',
  closable: true,
  content: `
     <h1>Modal is working</h1>
     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, sunt.</p>
  `,
  width: '400px',
  footerButtons: [
    {
      text: 'Ok', type: 'primary', handler() {
        modal.close()
      }
    },
    {
      text: 'Close', type: 'danger', handler() {
        modal.close()
      }
    }
  ]
})
