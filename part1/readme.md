## 1장

- 복잡한 기능을 수행하는 함수가 있을 때, 작은 동작은 더 작은 함수로 분리한다.
- 지역 변수는 최대한 제거한다.
- 제대로 리팩터링되었지만 성능이 조금 떨어지는 코드 VS. 성능이 뛰어나지만 유지보수가 어려운 코드

  - 경제적으로는 오히려 후자쪽이 비효율적인 선택이 될 수 있다.

- 지금까지는 switch문을 사용할 때 default 케이스를 설정하지 않거나 임의의 값을 리턴했는데, 앞으로는 오류를 throw하는 방법을 선택해야겠다.

**예시**

```
switch() {
  case "study":
    return "I Love Study!"
  case "exercise":
    return "I don't like exercise!"
  default:
    throw new Error("올바르지 않은 입력입니다.")
}
```

---

- 매개변수 이름이 단수일 때는 접두어 a를 붙여준다.

**예시**

```
function func1(aSchool, classRoomList) {
  return `${aSchool}애는 ${classRoomList.length}개의 강의실이 있습니다.`
}
```

---
