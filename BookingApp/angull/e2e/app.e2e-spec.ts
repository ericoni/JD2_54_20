import { AngullPage } from './app.po';

describe('angull App', () => {
  let page: AngullPage;

  beforeEach(() => {
    page = new AngullPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
