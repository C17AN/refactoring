import plays from "./plays.json"
import invoices from "./invoices.json"

function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

function amountFor(aPerformance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
    case "tragedy": // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy": // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }

  return result
}

function volumeCreditsFor(perf) {
  let volumeCredits = 0
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}

function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format;

  for (let perf of invoice.performances) {
    // amountFor(perf) 을 저장하는 별도의 변수가 필요하지 않을까?
    // 리팩터링의 관점에서는 성능이 저하되더라도 지역 변수의 남용으로 인한 코드의 난잡화를 더 경계해야 한다.
    // 다만, 해당 함수가 비동기 호출이나 복잡한 연산을 필요로 하는 경우에는 반드시 변수를 사용해야 한다고 생각한다.
    // (개발자의 경험 < 사용자 경험이 되어야 한다고 생각하기 때문이다.)
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf)
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

console.log(statement(invoices[0], plays))