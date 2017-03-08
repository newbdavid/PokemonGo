import { FrontEndJovenesCdfePage } from './app.po';

describe('front-end-jovenes-cdfe App', () => {
  let page: FrontEndJovenesCdfePage;

  beforeEach(() => {
    page = new FrontEndJovenesCdfePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
