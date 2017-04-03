import { GovermentAngularPage } from './app.po';

describe('goverment-angular App', () => {
  let page: GovermentAngularPage;

  beforeEach(() => {
    page = new GovermentAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
