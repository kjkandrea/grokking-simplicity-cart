export default abstract class AbstractRenderer {
  /**
   * 렌더링 될 엘리먼트를 의미합니다.
   */
  private readonly rootElement: HTMLElement;

  protected constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  /**
   * render 는 다음과 같이 구현합니다.
   * @param data. 렌더링 될 elements 에 쓰일 데이터
   * @return. void. 아무것도 리턴하지 않습니다.
   */
  public render(data: unknown) {
    const exampleAppendElement = document.createElement('div');
    exampleAppendElement.textContent = data as string;

    /**
     * rerender 를 단순하게 구현하기 위하여 rootElement 를 초기화 합니다.
     * 추 후 render 성능 최적화가 필요할 경우 별도의 추상 클래스를 만들어주세요.
     */
    this.rootElement.innerHTML = '';
    this.rootElement.append(exampleAppendElement);
  }
}
